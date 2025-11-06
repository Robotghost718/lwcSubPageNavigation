@isTest
public class NavigationLinkSetPickListTest {
    @IsTest
    static void testNavigationLinkSetPickList() {
        VisualEditor.DynamicPickListRows rows = new NavigationLinkSetPickList().getValues();
        System.assert(rows.size() > 0, 'No NavigationLinkSet records found.');
    }

@isTest
    static void testNavigationLinkSetPickListDefault() {
        VisualEditor.DataRow defaultValue = new NavigationLinkSetPickList().getDefaultValue();
        System.assertEquals('Default Navigation', defaultValue.getLabel());
    }
}