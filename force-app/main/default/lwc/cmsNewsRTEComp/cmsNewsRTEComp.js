import { LightningElement, wire, api } from 'lwc';
import getContent from '@salesforce/apex/ManagedContentController.getContent';

export default class CmsNewsRTEComp extends LightningElement {
    @api contentId;
    title;
    body;
    error;

    @wire(getContent, {
        contentId: '$contentId',
        page: 0,
        pageSize: 1,
        language: 'en_US',
        filterby: ''
    })
    results({ data, error }) {
        if (data) {
            this.title = data.title.value;
            
            // Step 1: Decode HTML entities from data.body.value to get the actual HTML string
            // If data.body.value is, e.g., "&lt;p&gt;&lt;img src='image.png'&gt;&lt;/p&gt;"
            // then htmlString becomes "<p><img src='image.png'></p>"
            const decoder = document.createElement('div');
            decoder.innerHTML = data.body.value; 
            let htmlString = decoder.textContent || decoder.innerText; 
            
            // Step 2: Parse this HTML string and modify img src attributes
            const tempElement = document.createElement('div');
            tempElement.innerHTML = htmlString; // Create a DOM structure from the HTML string

            console.log('Full HTML structure before processing:', tempElement.innerHTML);
            
            // Find ALL img elements regardless of parent
            const allImages = tempElement.querySelectorAll('img');
            console.log('Total images found:', allImages.length);
            
            allImages.forEach((img, index) => {
                const oldSrc = img.getAttribute('src');
                if (oldSrc) {
                    console.log('Processing image element with src: ' + oldSrc);
                    
                    // Check if it's a Salesforce CMS media URL that needs conversion
                    const salesforceMediaRegex = /https?:\/\/[^\/]+\.lightning\.force\.com\/cms\/media\/([A-Z0-9]+)(\?.*)?$/i;
                    const salesforceMediaMatch = oldSrc.match(salesforceMediaRegex);
                    
                    if (salesforceMediaMatch) {
                        // Convert Salesforce absolute URL to community path
                        const mediaId = salesforceMediaMatch[1];
                        const queryParams = salesforceMediaMatch[2] || '';
                        const newSrc = "/sfsites/c/cms/delivery/media/" + mediaId + queryParams;
                        img.setAttribute('src', newSrc);
                        console.log('Updated Salesforce media URL from: ' + oldSrc + ' to: ' + newSrc);
                    }
                    // Prepend community path if it's a relative path and not an absolute URL or data URI,
                    // and not already prefixed with /sfsites/c/
                    else if (!oldSrc.match(/^(?:https?:|\/\/|data:|\/sfsites\/c\/)/i)) {
                        // If oldSrc starts with a '/', remove it before prepending to avoid double slash
                        const path = oldSrc.startsWith('/') ? oldSrc.substring(1) : oldSrc;
                        const newSrc = "/sfsites/c/" + path;
                        img.setAttribute('src', newSrc);
                        console.log('Updated relative path from: ' + oldSrc + ' to: ' + newSrc);
                    } else {
                        console.log('Image src not modified (already absolute, data URI, or correctly prefixed): ' + oldSrc);
                    }
                            } else {
                    console.log('Image has no src attribute');
                }
            });
       

            this.body = tempElement.innerHTML; // Get the modified HTML string
            
            this.error = undefined;
            console.log('Title: ' + this.title);   
            console.log('Body with modified images: ' + this.body);
        }
        if (error) {
            console.log('Error: ' + JSON.stringify(error));
            this.error = error;
            this.title = undefined;
            this.body = undefined;
        }
    }
}