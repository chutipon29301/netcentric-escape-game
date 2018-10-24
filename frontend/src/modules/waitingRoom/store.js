import { observable, action } from 'mobx';

class waitingStore {
	@observable
	friends = [{name:'Cartoon1',email:'cartoon1@gmail.com'},
				{name:'Cartoon2',email:'cartoon2@gmail.com'},
				{name:'Cartoon3',email:'cartoon3@gmail.com'},
				{name:'Cartoon4',email:'cartoon4@gmail.com'},
				{name:'Cartoon5',email:'cartoon5@gmail.com'}];
	@observable
	currentFriend = {name: '', email: '' };

	@observable
	myReady = false;

	@observable
	//TODO: Recieve from backend
	friendReady = true;

	@action.bound
	setCurrentFriend(friend) {
		this.currentFriend = friend;
	}
	@action.bound
	setMyReady(myReady) {
		this.myReady = myReady;
	}
	@action.bound
	setFriendReady(friendReady) {
		this.friendReady = friendReady;
	}

}

export default new waitingStore();