const Menu = [
  {header: 'Hydropower Projects'},
  {
    title: 'Dashboard',
    group: 'apps',
    icon: 'dashboard',
    name: 'Dashboard',
    href: '/admin'
  },{
    title: 'Projects',
    group: 'apps',
    icon: 'library_books',
    name: 'Projects',
    href: '/admin/projects',
    items: [
      {name: 'hydro', title: 'Hydropower Projects', href: '/admin/projects/hydro'},
      {name: 'distribution', title: 'Distribution Projects', href: '/admin/projects/distribution'},
      {name: 'transmission', title: 'Transmission', href: '/admin/projects/transmission'}
    ]
  },{
    title: 'Organization',
    group: 'apps',
    icon: 'account_balance',
    name: 'Organization',
    href: '/admin/organization'
  },{
    title: 'Employee',
    group: 'apps',
    icon: 'supervisor_account',
    name: 'Employee',
    href: '/admin/employee'
  },{
    title: 'Setting',
    group: 'apps',
    icon: 'settings',
    name: 'Setting',
    href: '/admin/setting'
  }
];
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default Menu;
