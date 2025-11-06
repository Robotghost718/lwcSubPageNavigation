# LWC Sub-Page Navigation

A custom Lightning Web Component (LWC) navigation solution for Salesforce Experience Cloud (formerly Community Cloud) that provides enhanced sub-page navigation capabilities with dynamic highlighting and menu management.

## Features

- 🎯 **Dynamic Navigation Menus**: Fetch and display navigation menu items dynamically using Apex controllers
- 🔍 **Active Page Highlighting**: Automatically highlights the current page in the navigation menu
- 📱 **Responsive Design**: Built-in responsive styling for mobile and desktop views
- 🌲 **Hierarchical Menus**: Support for parent-child menu item relationships
- 🎨 **Multiple Navigation Styles**: Includes both bulleted and child menu item components
- ⚡ **Performance Optimized**: Uses cacheable Apex methods and reactive LWC patterns
- 🛠️ **CMS Components**: Includes additional CMS utility components for content management

## Components

### Navigation Components

- **`bulletedSubPageNav`**: Main sub-page navigation component with bulleted list styling
- **`subPageNav`**: Vertical navigation component with support for menu labels and hierarchical items
- **`bulletedNavItem`**: Individual navigation item with styling
- **`childNavMenuItem`**: Child navigation menu item component
- **`childSubPageItem`**: Sub-page child item component

### CMS Components

- **`cmsAutoMarginComp`**: Auto-margin utility component for CMS layouts
- **`cmsNewsRTEComp`**: Rich text editor component for news content

## Installation

### Prerequisites

- Salesforce CLI installed
- VS Code with Salesforce Extensions (recommended)
- A Salesforce org with Experience Cloud enabled

### Deploy to Salesforce

1. Clone this repository:
   ```bash
   git clone https://github.com/Robotghost718/lwcSubPageNavigation.git
   cd lwcSubPageNavigation
   ```

2. Authenticate with your Salesforce org:
   ```bash
   sf org login web -a YourOrgAlias
   ```

3. Deploy the components:
   ```bash
   sf project deploy start
   ```

### Create a Scratch Org (For Development)

1. Create a scratch org:
   ```bash
   sf org create scratch -f config/project-scratch-def.json -a lwcNavScratch
   ```

2. Push the source:
   ```bash
   sf project deploy start -o lwcNavScratch
   ```

3. Open the scratch org:
   ```bash
   sf org open -o lwcNavScratch
   ```

## Usage

### Setting Up Navigation Menu

1. In your Salesforce org, go to **Setup** > **Digital Experiences** > **Settings**
2. Create or edit a Navigation Menu
3. Add menu items with labels and targets

### Adding Component to Experience Cloud Page

1. Open Experience Builder for your site
2. Drag the **bulletedSubPageNav** component onto your page
3. Configure the component properties:
   - **Link Set Master Label**: The name of your navigation menu
   - **Add Home Menu Item**: Toggle to include/exclude home link
   - **Include Image URLs**: Enable if using images in menu items

### Permissions

⚠️ **Important**: Ensure the Guest user profile (or relevant user profiles) has access to:
- `NavigationMenuItemsController` Apex class
- `NavigationLinkSetPickList` Apex class (if using the picklist feature)

## Configuration

### Component Properties

#### bulletedSubPageNav

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `linkSetMasterLabel` | String | Navigation menu name | Required |
| `addHomeMenuItem` | Boolean | Include home link | `false` |
| `includeImageUrls` | Boolean | Fetch image URLs | `false` |

## Development

### Install Dependencies

```bash
npm install
```

### Run Tests

```bash
npm run test:unit
```

### Lint Code

```bash
npm run lint
```

### Format Code

```bash
npm run prettier
```

## Project Structure

```
lwcSubPageNavigation/
├── force-app/main/default/
│   ├── classes/              # Apex controllers and tests
│   └── lwc/                  # Lightning Web Components
├── config/                   # Scratch org definitions
├── .github/                  # GitHub templates and workflows
└── package.json             # Node.js dependencies
```

## Testing

The project includes comprehensive test coverage:

- **Apex Tests**: 
  - `NavigationMenuItemsControllerTest.cls`
  - `NavigationLinkSetPickListTest.cls`
  
- **Jest Tests**: LWC unit tests can be run with `npm run test:unit`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Resources

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Lightning Web Components Developer Guide](https://developer.salesforce.com/docs/component-library/documentation/en/lwc)
- [Experience Cloud Documentation](https://help.salesforce.com/s/articleView?id=sf.networks_overview.htm)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Built with ⚡ using Salesforce Lightning Web Components
