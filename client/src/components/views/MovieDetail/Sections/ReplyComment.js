import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);
    useEffect(() => {
        let commentNumber = 0;
        // eslint-disable-next-line
        props.CommentLists.map((comment) => {
            if (comment.responseTo === props.parentCommentId) {
                commentNumber++;
            }
        });
        setChildCommentNumber(commentNumber);
    }, [props.CommentLists, props.parentCommentId]);

    let renderReplyComment = (parentCommentId) =>
        props.CommentLists.map((comment, index) => (
            <React.Fragment>
                {comment.responseTo === parentCommentId && (
                    <div className="single-comment">
                        <SingleComment
                            comment={comment}
                            postId={props.postId}
                            refreshFunction={props.refreshFunction}
                        />
                        <ReplyComment
                            CommentLists={props.CommentLists}
                            parentCommentId={comment._id}
                            postId={props.postId}
                            refreshFunction={props.refreshFunction}
                        />
                    </div>
                )}
            </React.Fragment>
        ));

    const handleChange = () => {
        setOpenReplyComments(!OpenReplyComments);
    };

    return (
        <div>
            {ChildCommentNumber > 0 && (
                <p className="more-comments" onClick={handleChange}>
                    View {ChildCommentNumber} more comment(s)
                </p>
            )}

            {OpenReplyComments && renderReplyComment(props.parentCommentId)}
        </div>
    );
}

export default ReplyComment;
