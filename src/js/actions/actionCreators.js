import * as types from './constants';

export function initPosts(posts){
	return {
		type : types.INIT_POSTS,
		posts
	}
}

export function setSubreddit(subreddit){
	return {
		type : types.SET_SUBREDDIT,
		subreddit
	}
}

export function setFetching(fetching){
	return {
		type : types.FETCHING,
		fetching
	}
}

export function fetchPosts(path){
	return (dispatch) => {
		dispatch(setFetching(true));
		return fetch(`https://www.reddit.com/${path}/.json`)
    			.then(response => response.json())
    			.then(json => {
        			dispatch(initPosts(json.data.children));
    			});
	}
}