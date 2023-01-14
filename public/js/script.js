$(document).ready(function() {

    let baseUrl = window.location.origin;



    setTimeout(() => {
        getDetails('all')
    }, 2000);
    function getDetails(filterby) {
        $.ajax({
            url : baseUrl + '/public/js/category.json',
            method : 'get'
        }).done(function(res){
            $('.loader-container').addClass('d-none');
            let result;
            let content = '';
            if (filterby === 'all') {
                result = res
            } else {
                result = res.filter(item => {
                    return (item.type === filterby) ? item : ''
                });
            }

            if (result.length > 0) {
                $.each(result,function(ind,val){
                    content += `
                    <div class="card">
                        <img src=${val.img} alt="bd-img">
                        <div class="card-body">
                            <h2 class="title">${val.title}</h2>
                            <p class="author-container"><span class="author">${val.author_details[0].name}</span> <span class="date"> | ${val.author_details[0].date}</span></p>
                            <p class="desc">
                            ${val.desc}
                            </p>
                        </div>
                    </div>
                    `
                })
            }else {
                
                content += `
                    <div class='not_avail'>
                        <p>Current this course is not available</p>
                    </div>
                    `
            }
            $('.categories-items').html(content)
        }).fail(function(res){
            console.log(res);
        })
    }


    $('.filter-items .item').on('click',function(){
        $('.loader-container').removeClass('d-none');
        var filterdata = $(this).attr('data-filter-data');
        $('.filter-items .item').removeClass('active');
        $(this).addClass('active');
        setTimeout(() => {
            getDetails(filterdata);
        }, 2000);
    })

    

})