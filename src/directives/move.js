export default {
  mounted(el, binding) {
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;
    // 获取图片的边界限制
    const getParentBounds = () => {
      return el.parentElement.querySelector('.img-canvas').getBoundingClientRect();
    };
    const onMouseDown = (evt) => {
      isDragging = true;
      startX = evt.clientX;
      startY = evt.clientY;
      initialLeft = el.offsetLeft;
      initialTop = el.offsetTop;

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (evt) => {
      if (!isDragging) return;
      const moveX = evt.clientX - startX;
      const moveY = evt.clientY - startY;
      // 边界检查
      let newLeft = initialLeft + moveX;
      let newTop = initialTop + moveY;
      if(newLeft <= 0) { // 左
        newLeft = 4
      }
      if(newTop <= 0) { // 上
        newTop = 4
      }
      // debugger
      const parentBounds = getParentBounds();
      if(newLeft + el.clientWidth > parentBounds.width){ // 右
        newLeft = parentBounds.width - el.clientWidth - 4
      }
      if(newTop + el.clientHeight > parentBounds.height){ // 下
        newTop = parentBounds.height - el.clientHeight - 4
      }
      el.style.left = `${newLeft}px`;
      el.style.top = `${newTop}px`;
    };

    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      
      // 调用传入的 onMove 函数
      if (binding.value) {
        binding.value({ x: el.offsetLeft, y: el.offsetTop });
      }
    };

    el.addEventListener('mousedown', onMouseDown);
  }
};