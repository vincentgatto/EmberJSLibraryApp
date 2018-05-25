import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.findAll('contact');
  },
  actions: {
    deleteMessage(contact){
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        contact.destroyRecord();
      }
    }
  }
});
