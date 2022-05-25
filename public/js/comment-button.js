const commentFormHandler = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');
    console.log('data-id')
    const content = document.querySelector('#content').value.trim();
    const response = await fetch(`/api/comment/${id}`, {

        method: 'POST',
        body: JSON.stringify({
            content,
            comment_id: id
        }),
        headers: {
            'Content-Type': 'application/json',
        },

    });
    console.log(response)
    if (response.ok) {
        document.location.replace(`/comment/${id}`);

    } else {
        alert('Failed to add comment');
    }

};
document.querySelector('.new-comment-form').addEventListener('submit', commentFormHandler);