Organizations = new Mongo.Collection('organizations');

Organizations.attachSchema(new SimpleSchema({
  status: {
    type: String,
    label: 'status'
  },
  
  name: {
    type: String,
    label: 'name'
  },

  url: {
    type: String,
    label: 'url'
  }
}));

if (Meteor.isClient) {
  var FooModalAction = React.createClass({
    render() {
      return (
        <ReactBootstrap.Modal show={this.props.show} onHide={this.props.onHide}>
          <ReactBootstrap.Modal.Header closeButton>
            {this.props.title}
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body>
            foo on ids: {this.props.selectedIds.join(', ')}
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer>
            &nbsp;
          </ReactBootstrap.Modal.Footer>
        </ReactBootstrap.Modal>
      );
    }
  });

  CollectionManager.compose(Organizations, 'OrganizationsManager', {
    actions: {
      fooAction: {
        title: "Foo Action",
        modal: FooModalAction
      }
    }
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
