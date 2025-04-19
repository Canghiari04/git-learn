import { useNavigate } from 'react-router-dom';

export function BackShortCut(route) {
  var navigate = useNavigate();

  document.addEventListener("keydown", (event) => {
    if (event.shiftKey && event.ctrlKey) {
        navigate(route);
    }
  });
}

export function ForwardShortCut(route) {
  var navigate = useNavigate();
  
  document.addEventListener("keydown", (event) => {
    if (event.shiftKey && event.code === "Enter") {
      navigate(route);
    }
  });
}