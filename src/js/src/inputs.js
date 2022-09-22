$(document).ready(function () {
    $('[data-inputmask]').inputmask({
        jitMasking: false
    });

    function handleRequiredInput() {
        if ($(this).attr('data-inputmask')) {

            if ($(this).inputmask("isComplete")) {
                $(this).parent().addClass('--success')
                if ($(this).parent().hasClass('error')) {
                    $(this).parent().removeClass('error')
                }
            } else {
                $(this).parent().removeClass('--success')
                $(this).parent().addClass('error');
            }
        } else {
            if ($(this).val() === '') {
                $(this).parent().removeClass('--success')
                $(this).parent().addClass('error');
            } else {
                $(this).parent().addClass('--success')
                if ($(this).parent().hasClass('error')) {
                    $(this).parent().removeClass('error')
                }
            }
        }
    }

    $('input[required]').on('focusout', handleRequiredInput);
    $('textarea[required]').on('focusout', handleRequiredInput);
    $('form').on('submit', function (e) {
        e.preventDefault();
        let postData = {}
        $(this).serializeArray().forEach((item) => {
            postData[item['name']] = item['value'];
        });
        console.log({...postData});
        if ($(this).data('success')) {
            let successModal = $(this).data('success')

            $('.modal').modal('hide')
            $(successModal).modal('show');
        }
    })
});