import axios from "axios";
import routes from "../../routes";
const deleteBtn = document.querySelectorAll(".deletebutton");
const ul = document.querySelector(".video__comments-list");
const commentNumber = document.getElementById("jsCommentNumber");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const handleDelete = async (event) => {
  const who = event.target;
  const del = who.parentNode;
  const comment = who.value;
  const response = await axios({
    url: `${routes.api}/${comment}/comment/delete`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    ul.removeChild(del);
    decreaseNumber();
  }
};

function init() {
  deleteBtn.forEach(function (item) {
    item.addEventListener("click", handleDelete);
  });
}

if (deleteBtn) {
  init();
}
