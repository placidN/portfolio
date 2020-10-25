
const progress_float    = document.querySelector('.progress_float');
const flash_contain     = document.querySelector('.flash_contain');
const flash_text        = document.querySelector('.flash_text');

const name              = document.querySelector('#name');
const email             = document.querySelector('#email');
const message_content   = document.querySelector('#message');
const submit__btn       = document.querySelector('#submit__btn');

submit__btn.addEventListener('click', async () => {
    progress_float.classList.toggle('hide');
    let valueArr = [name, email, message_content];

    for(let i = 0;i < valueArr.length;i++){
        if(!valueArr[i].value){
            let text = valueArr[i].placeholder;
            progress_float.classList.toggle('hide');
            flash_text.style.color = 'red';
            return _flash(`${text} required`, 'error');
        }
    }
    let sent = await sdMl(email.value, name.value, message_content.value)

    email.value             = '';
    name.value              = '';
    message_content.value   = '';
    if(sent){
        progress_float.classList.toggle('hide');
        flash_text.style.color = 'green';
        return _flash('Thanks for contacting me<br/>I will get back to you as soon as possible.', 'success');
    }else{
        progress_float.classList.toggle('hide');
        flash_text.style.color = 'green';
        return _flash('Thanks for contacting me<br/>I will get back to you as soon as possible...', 'success');
    }

});

function _flash(msg, type){
    let timer       = 0;

    if(type == 'success'){
        timer       = 5000;
    }
    if(type == 'error'){
        timer       = 3000;
    }
    flash_contain.classList.toggle('hide');
    flash_text.innerHTML        = msg;

    flash__counter(timer)
}

function flash__counter(timer = 3000){
    setTimeout(()=>{
        flash_contain.classList.toggle('hide');
        flash_text.innerHTML = '';
    }, timer);
}

function sdMl(eml, name, message){
    // send mail and return bool
    name = name.charAt(0).toUpperCase() + name.slice(1);
    $.get('https://ipinfo.io/?token=f89fe714bd7972', function(data) {
        let resp = data,
            current_time = new Date().toTimeString(),
            msg = `<h3>You were contacted by ${name}</h3>
                    <h5 style="color:#ddd;">Email Address: ${eml}</h5>
                    <p>${message}</p>
                `
        Email.send({
            Host : "smtp.gmail.com",
            Username : "freshmarket538@gmail.com",
            Password : "icui4cu100",
            To : "placidonthejob@gmail.com",
            From : "freshmarket538@gmail.com",
            Subject : "You Were Contacted!",
            Body : msg
            })
        .then(message => {
            if(message == 'OK'){
                return true;
            }else{
                return false;
            }
        })
    })
}
