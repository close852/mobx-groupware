/* store/viewStore.js */
import { decorate, observable, action } from 'mobx';

class ViewStore {
  constructor() {
    this.isShowModal = false;
  }
  hideModal = () => {
    this.isShowModal = false;
  }
  showModal = () => {
    this.isShowModal = true;
  }
}

decorate(ViewStore, {
  isShowModal: observable,
  hideModal: action,
  showModal: action,
})

export default ViewStore
