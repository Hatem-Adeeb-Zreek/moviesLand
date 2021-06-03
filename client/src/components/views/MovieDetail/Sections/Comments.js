import React, { useState } from "react";
import { Button, Input, Typography } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
const { TextArea } = Input;
const { Title } = Typography;
function Comments(props) {
    const user = useSelector((state) => state.user);
    const [Comment, setComment] = useState("");

    const handleChange = (e) => {
        setComment(e.currentTarget.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (user.userData && !user.userData.isAuth) {
            return alert("Please Log in first");
        }

        const variables = {
            content: Comment,
            writer: user.userData._id,
            postId: props.postId,
        };
        console.log(variables);

        axios.post("/api/comment/saveComment", variables).then((response) => {
            if (response.data.success) {
                setComment("");
                props.refreshFunction(response.data.result);
            } else {
                alert("Failed to save Comment");
            }
        });
    };

    return (
        <div>
            <br />
            <Title level={3}>
                Share your opinions about {props.movieTitle}
            </Title>
            <hr />
            {/* Comment Lists  */}
            {console.log(props.CommentLists)}

            {props.CommentLists &&
                props.CommentLists.map(
                    (comment, index) =>
                        !comment.responseTo && (
                            <React.Fragment>
                                <SingleComment
                                    comment={comment}
                                    postId={props.postId}
                                    refreshFunction={props.refreshFunction}
                                />
                                <ReplyComment
                                    CommentLists={props.CommentLists}
                                    postId={props.postId}
                                    parentCommentId={comment._id}
                                    refreshFunction={props.refreshFunction}
                                />
                            </React.Fragment>
                        )
                )}

            {props.CommentLists && props.CommentLists.length === 0 && (
                <div className="comments-wrapper">
                    Be the first one who shares your thought about this movie
                </div>
            )}

            {/* Root Comment Form */}
            <form style={{ display: "flex" }} onSubmit={onSubmit}>
                <TextArea
                    className="comment-area"
                    onChange={handleChange}
                    value={Comment}
                    placeholder="write some comments"
                />
                <br />
                <Button type="primary" onClick={onSubmit}>
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default Comments;
