if (Meteor.isClient) {
  ReactMeteor.createClass({
    mixins: [CollectionManagerMixin],

    templateName:   'OrganizationManager',
    collectionName: 'Organizations',
    itemSingular:   'organization',
    itemPlural:     'organizations',

    columns: [
      {field: 'name',        label: 'Name'},
      {field: 'url',         label: 'Website', type: 'url'},
      {field: 'memberCount', label: 'Members', type: 'number'}
    ]
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Organizations.find().count() == 0) {
      console.log('Adding startup data...');
      var organizations = [
        {name: 'Foobar Group, Inc.', url: 'http://foobar.example.com', memberCount: 50},
        {name: 'Bazzy Group, Inc.', url: 'http://bazzy.example.com', memberCount: 20},
        {name: 'Vertigo Group, Inc.', url: 'http://vertigo.example.com', memberCount: 3},
      ];

      organizations.map(function (obj, i) {
        Organizations.insert(obj);
        console.log('Inserted organization: ', obj);
      });
    }
  });
}
