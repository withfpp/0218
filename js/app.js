//엠버 앱 생성
App = Ember.Application.create();

// 라우터
App.Router.map(function (){
	this.resource('about');

	//nested route
	this.resource('posts', function(){
		this.resource('post', { path: ':post_id' });
	});
});


// 라우트 오브젝트의 서브 클래스 생성
App.PostsRoute = Ember.Route.extend({

	//라우트 객체는 모델이라는 메서드를 가지고 있다. 어떤 모델을 사용 할 것인지 정의.
	model: function(){
		return posts;
	}
});

App.PostRoute = Ember.Route.extend({
	model: function(params){
		return posts.findBy('id', params.post_id);
	}
});




App.PostController = Ember.ObjectController.extend({
	isEditing: false,

	actions: {
		edit: function(){
			this.set('isEditing', true);
		},

		doneEditing: function(){
			this.set('isEditing', false);
		}
	}


});


Ember.Handlebars.helper('format-date', function(date){
	// moment.js사용
	return moment(date).fromNow();
});

var posts = [{ 
	id: '1',
	title: "Ruby on Rails is awesome..",
	author: {name: 'teo kim'},
	date: new Date('01-01-2014'),
	excerpt: "Lorem ipsum dolor sit ",
	body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, consequuntur quam exercitationem iure dicta voluptatibus commodi nesciunt nam consectetur excepturi sed reprehenderit. Accusantium quia cumque repudiandae eum aperiam quam ut."
},{
	id: '2',
	title: "Ember.js first tutorial",
	author: {name: 'teo kim'},
	date: new Date('02-02-2014'),
	excerpt: "Lorem ipsum dolor sit ",
	body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, consequuntur quam exercitationem iure dicta voluptatibus commodi nesciunt nam consectetur excepturi sed reprehenderit. Accusantium quia cumque repudiandae eum aperiam quam ut."
	
}];