import React, { Component } from 'react';
import Lodash from 'lodash';
import CommentsList from './CommentsList';
import CommentsForm from './CommentsForm';
import './comments.less';

const commentsBase = {

    getComments: () => {

        if (!this.comments)
            this.comments = JSON.parse(window.localStorage.getItem('comments')) || [];

        return this.comments;
    },

    setComment: (data) => {

        this.comments.push(data);

        window.localStorage.setItem('comments', JSON.stringify(this.comments));

        return true;

    },

    removeComment: (commentId) => {

        Lodash.remove(this.comments, {id: commentId});

        window.localStorage.setItem('comments', JSON.stringify(this.comments));

    }
};


class Comments extends Component {

    state = {
        comments: commentsBase.getComments()
    };

    deleteCommentHandler = (e, id) => {

        e.preventDefault();

        commentsBase.removeComment(id);

        this.setState({comments: commentsBase.getComments()});

    };

    sendCommentHandler = (e) => {

        e.preventDefault();

        const data = {
            id: `comment_${Math.ceil(Math.random()*1000)}`,
            author: e.target.author.value,
            text: e.target.text.value,
            date: new Date().getTime()
        };

        commentsBase.setComment(data);

        e.target.reset();

        this.setState({comments: commentsBase.getComments()});

    };

    render() {
        return (
            <div className="comments">
                <CommentsList
                    deleteCommentHandler={this.deleteCommentHandler}
                    comments={this.state.comments} />
                <CommentsForm
                    sendCommentHandler={this.sendCommentHandler} />
            </div>
        );
    }
}

export default Comments;