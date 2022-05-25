async function editFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  console.log("value", id)
  const response = await fetch(`/api/edit-comment/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      content
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace(`/account-comment`);
  } else {
    console.log(response)
    alert('Failed to edit comment');
  }
}

document.querySelector('.edit-comment-form').addEventListener('submit', editFormHandler);