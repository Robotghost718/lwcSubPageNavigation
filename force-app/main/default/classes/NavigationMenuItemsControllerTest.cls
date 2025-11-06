@isTest(SeeAllData=true)
public class NavigationMenuItemsControllerTest {
    @isTest
    public static void testNavigationLinkSet() {
            test.startTest();
        String developerName = NavigationMenuItemsController.getNavigationLinkSetDeveloperName('Academics');
        test.stopTest();
        System.debug(developerName);
        // System.Assert.areEqual(developerName, 'Global_Navigation');      
        Assert.isNotNull(developerName, 'developerName is Null');
    }

    @isTest
    static void testNavigationMenuItems() {
            test.startTest();
        List<ConnectApi.NavigationMenuItem> items = NavigationMenuItemsController.getNavigationMenuItems('Academics', 'Live', true, true);
        test.stopTest();
        System.debug(items);
        Assert.isNotNull(items, 'NavigationMenuItems is null');

}
@isTest
static void testNavigationMenuItemsDraft() {
        test.startTest();
    List<ConnectApi.NavigationMenuItem> items = NavigationMenuItemsController.getNavigationMenuItems('Academics', 'Draft', true, true);
    test.stopTest();
    System.debug(items);
    Assert.isNotNull(items, 'items should not be null');

}
}