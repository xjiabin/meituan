const isEmail = (v) => {
    let emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (emailReg.test(v)) {
        return true;
    } else {
        return false;
    }
}

const debounce = (fn, delay) => {
    let timer = null;
    return function() {
        let context = this;
        let args = arguments;

        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    }
}

export default {
    isEmail,
    debounce
}
