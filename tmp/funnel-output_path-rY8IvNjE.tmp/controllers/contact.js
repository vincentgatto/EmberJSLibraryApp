import Controller from '@ember/controller';
import { gte, match, and, not} from '@ember/object/computed';

export default Controller.extend({

  successMessage: '',
  emailAddress2: '',
  textMessage: '',
  
  isValidEmail: match('emailAddress2', /^.+@.+\..+$/),
  isLong: gte('textMessage.length', 5), 
  
  isValid: and('isValidEmail','isLong'),
  isDisabled2: not('isValid'),
  
  actions:{
      saveMessage(){
        const email = this.get('emailAddress2');
        const message = this.get('textMessage');

        const newContact = this.store.createRecord('contact', { email, message });

        newContact.save().then(response => {
          this.set('successMessage', `Thank you! We saved your email address with the following id: ${response.get('id')}`);
          this.set('emailAddress2', '');
          this.set('textMessage', '');
         });
      }
    }
});
