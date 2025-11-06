import { LightningElement, api, wire, track } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';

import getNavigationMenuItems from '@salesforce/apex/NavigationMenuItemsController.getNavigationMenuItems';

/**
 * This is a custom LWC navigation menu component.
 * Make sure the Guest user profile has access to the NavigationMenuItemsController apex class.
 */
export default class bulletedSubPageNav extends NavigationMixin(LightningElement) {

    /**
     * the label or name of the nav menu linkset (NavigationMenuLinkSet.MasterLabel) exposed by the .js-meta.xml,
     * used to look up the NavigationMenuLinkSet.DeveloperName
     */
     @api linkSetMasterLabel;

     /**
      * include the Home menu item, if true
      */
     @api addHomeMenuItem = false;
 
     /**
      * include image URLs in the response, if true
      * useful for building a tile menu with images
      */
     @api includeImageUrls = false;

    /**
     * the menu items when fetched by the NavigationItemsController
     */
    @track menuItems = [];

    /**
     * if the items have been loaded
     */
    @track isLoaded = false;

    /**
     * the error if it occurs
     */
    @track error;

    /**
     * the published state of the site, used to determine from which schema to 
     * fetch the NavigationMenuItems
     */
    publishStatus;

      // ...existing code...
    extractUrlSegment() {
        try {
            // Use the URL constructor to easily access the pathname
            const currentUrl = new URL(window.location.href);
            const pathname = currentUrl.pathname; // e.g., "/s/pageName" or "/s/pageName/"
                                                // This correctly excludes query params and hash.
    
            // Find the index of the last slash
            const lastSlashIndex = pathname.lastIndexOf('/');
    
            // If pathname is something like "/pageName", lastSlashIndex is 0.
            // pathname.substring(0 + 1) gives "pageName".
            // If pathname is "/pageName/", lastSlashIndex is for the trailing slash.
            // pathname.substring(lastSlashIndex + 1) gives "".
            // If pathname is "/", lastSlashIndex is 0.
            // pathname.substring(0 + 1) gives "".
            if (lastSlashIndex === -1) {
                // This case is highly unlikely for a standard pathname which starts with '/',
                // but if it occurred and pathname was "pageName" (no slashes),
                // then the whole pathname is the segment.
                return pathname;
            }
            return pathname.substring(lastSlashIndex + 1);
        } catch (e) {
            // Fallback for environments where URL constructor might not be available
            // or if window.location.href is unexpectedly malformed.
            console.warn('Could not parse URL with URL constructor, using fallback string manipulation for extractUrlSegment:', e);
            
            let pathString = window.location.href;
    
            // Remove query string if present
            const queryIndex = pathString.indexOf('?');
            if (queryIndex !== -1) {
                pathString = pathString.substring(0, queryIndex);
            }
    
            // Remove hash fragment if present
            const hashIndex = pathString.indexOf('#');
            if (hashIndex !== -1) {
                pathString = pathString.substring(0, hashIndex);
            }
    
            // To correctly find the "path" part from a full URL string like "http://host/path/segment"
            // we need to isolate the path part first.
            let searchPath = pathString;
            const schemeEndIndex = pathString.indexOf("://");
            if (schemeEndIndex !== -1) {
                // Find the first '/' after the scheme and authority part (e.g., "http://example.com")
                const pathStartIndex = pathString.indexOf('/', schemeEndIndex + 3);
                if (pathStartIndex !== -1) {
                    searchPath = pathString.substring(pathStartIndex); // Now searchPath is like "/foo/bar" or "/"
                } else {
                    // URL is like "http://example.com" (no path part after host)
                    return ""; // No segment after the last slash in the path part
                }
            }
            // If no scheme (e.g. relative URL, though href is usually absolute) or already processed,
            // searchPath is now the actual path part (e.g., "/foo/bar", "/foo/", "/") or a filename.
    
            const lastSlashIndexInPath = searchPath.lastIndexOf('/');
            if (lastSlashIndexInPath === -1) {
                // No slashes in searchPath (e.g., "filename.html" or if searchPath became empty)
                return searchPath;
            }
            // If searchPath is "/", lastSlashIndexInPath is 0, returns ""
            // If searchPath is "/foo", lastSlashIndexInPath is 0, returns "foo"
            // If searchPath is "/foo/", lastSlashIndexInPath is the index of the trailing slash, returns ""
            return searchPath.substring(lastSlashIndexInPath + 1);
        }
    }
    // ...existing code...
    // @api selectedName;
    /**
     * Using a custom Apex controller, query for the NavigationMenuItems using the
     * menu name and published state.
     * 
     * The custom Apex controller is wired to provide reactive results. 
     */
   renderedCallback() {

       for (let i = 0; i < this.menuItems.length; i++) {
           if( this.menuItems[i].target.endsWith(this.extractUrlSegment() )){
               this.template.querySelector(`c-bulleted-nav-item[data-id="${this.menuItems[i].id}"]`).classList.add('selectedSubPage');
               console.log('selectedSubPage', this.menuItems[i].target);
               console.log('extractUrlSegment', this.extractUrlSegment());
           }
           else {
            this.template.querySelector(`c-bulleted-nav-item[data-id="${this.menuItems[i].id}"]`).classList.remove('selectedSubPage');
        }
    }
    console.log('subpageNav connectedCallback');
}
    @wire(getNavigationMenuItems, {
        navigationLinkSetMasterLabel: '$linkSetMasterLabel',
        publishStatus: '$publishStatus',
        addHomeMenuItem: '$addHomeMenuItem',
        includeImageUrl: '$includeImageUrls'
    })
    wiredMenuItems({error, data}) {
        if (data && !this.isLoaded) {
            this.menuItems = data.map((item, index) => {
                return {
                    target: item.actionValue,
                    id: index,
                    label: item.label,
                    type: item.actionType,
                    subMenu: item.subMenu,
                    imageUrl: item.imageUrl,
                    windowName: item.target,
                }
            });
            this.error = undefined;
            this.isLoaded = true;
            console.log('menu items ', JSON.stringify(this.menuItems));
            console.log('linkSetMasternLabel ', JSON.stringify(this.linkSetMasterLabel));
        } else if (error) {
            this.error = error;
            this.menuItems = [];
            this.isLoaded = true;
            console.error(`Navigation menu error: ${JSON.stringify(this.error)}`);
        }
    }

    /**
     * Using the CurrentPageReference, check if the app is 'commeditor'.
     * 
     * If the app is 'commeditor', then the page will use 'Draft' NavigationMenuItems. 
     * Otherwise, it will use the 'Live' schema.
    */
    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        console.log(currentPageReference + "before" + JSON.stringify(currentPageReference));
        const app = currentPageReference && currentPageReference.state && currentPageReference.state.app;
        if (app === 'commeditor') {
            this.publishStatus = 'Draft';
        } else {
            this.publishStatus = 'Live';
        }
        console.log(currentPageReference + "after" + JSON.stringify(currentPageReference));
    }
}