// This is meant to be a challenging exercise. It's 100% OK if you can't solve it. Spend 5-10 minutes on it, and then we will continue on with the lesson.

// Acceptance criteria:

// A link should be shown in the “Result” pane, linking to wikipedia.org, and with the text “Read more on Wikipedia”.
// It should work with any element type (eg. anchors, paragraphs, buttons…)
// It should handle all HTML attributes (eg. href, id, disabled…)
// The element should contain the text specified under children. children will always be a string.

function render(reactElement, containerDOMElement) {
  /* Your code here! */
}

const reactElement = {
  type: "a",
  props: {
    href: "https://wikipedia.org/",
  },
  children: "Read more on Wikipedia",
};

const containerDOMElement = document.querySelector("#root");

render(reactElement, containerDOMElement);
