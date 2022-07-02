window.addEventListener('DOMContentLoaded', () => {
   
        // ---------------- surfboards slider ---------------------------------------------------

        new Swiper('.swiper', {

            allowTouchMove: false,
            speed: 2300,
            loop: true,
            loopPreventsSlide: true,
            preventInteractionOnTransition: true,

            navigation: {
                nextEl: '.swiper-button-nextu',
                prevEl: '.swiper-button-prevu'
            },
        
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
                clickable: true,
                dynamicBullets: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                },
            },
        });

        // ---------------- burger -----------------------------------------

    const burger = document.querySelector('.burger'),
          menu = document.querySelector('.menu');

          burger.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.toggle('noscroll');
            burger.classList.toggle('show-nav');
            menu.classList.toggle('show-nav');
          });
        
          let ratings = document.querySelectorAll('.rating'),
              activeSlide = document.querySelector('.swiper-slide-active'),
              descr = document.querySelector('.swiper-slide-active .surfboards__item_descr'),
              feat = document.querySelector('.swiper-slide-active .surfboards__item_feat'),
              dimen = document.querySelector('.swiper-slide-active .surfboards__item_dimen'),
              decor = document.querySelectorAll('.surfboards__text_decor'),              
              decorActive = document.querySelector('.surfboards__text_decor.active'),
              itemsText = document.querySelectorAll('.swiper-slide-active .surfboards__text_item'),
              descrText = document.querySelector('.swiper-slide-active .item__descr_text'),
              featText = document.querySelector('.swiper-slide-active .item__feat_text'),
              dimenText = document.querySelector('.swiper-slide-active .item__dimen_text'),
              btnPrev = document.querySelector('.swiper-button-prevu'),
              btnNext = document.querySelector('.swiper-button-nextu'),
              carSlider = document.querySelectorAll('.carslider'),
              activeCarus = activeSlide.querySelector('.carslider');

              let activeDblSlide01 = document.querySelector('.swiper-slide-duplicate-prev');
              let activeDblSlide02 = document.querySelector('.swiper-slide-duplicate-active');
              tempDblSl1 = activeDblSlide01.querySelector('.carslider');
              tempDblSl1.id="carousel4";
              tempDblSl2 = activeDblSlide02.querySelector('.carslider');
              tempDblSl2.id="carousel5";

              tempBtn1 = activeDblSlide01.querySelectorAll('button');
              tempBtn1.forEach(btn => {
                  btn.setAttribute('data-bs-target', "#carousel4");
              });

              tempBtn2 = activeDblSlide02.querySelectorAll('button');
              tempBtn2.forEach(btn => {
                  btn.setAttribute('data-bs-target', "#carousel5");
              });


        // ---------------- stars ---------------------------------------------------

        if (ratings.length > 0) {
            initRatings();
        }

        function initRatings() {
            let ratingActive, ratingValue;
            for (let index = 0; index < ratings.length; index++) {
                const rating = ratings[index];
                initRating(rating);
            }

            function initRating(rating) {
                initRatingVars(rating);
                setRatingActiveWidth();
                if (rating.classList.contains('rating_set')) {
                    setRating(rating);
                }
            }

            function initRatingVars(rating) {
                ratingActive = rating.querySelector('.rating__active');
                ratingValue = rating.querySelector('.rating__value');
            }

            function setRatingActiveWidth(index = ratingValue.innerHTML) {
                const ratingActiveWidth = index / 0.05;
                ratingActive.style.width = `${ratingActiveWidth}%`;
            }

            function setRating(rating) {
                const ratingItems = rating.querySelectorAll('.rating__item');
                for (let index = 0; index < ratingItems.length; index++) {
                    const ratingItem = ratingItems[index];
                    ratingItem.addEventListener("mouseenter", function(e) {
                        initRatingVars(rating);
                        setRatingActiveWidth(ratingItem.value);
                    });

                    ratingItem.addEventListener("mouseleave", function(e) {
                        setRatingActiveWidth();
                    });

                    ratingItem.addEventListener("click", function(e) {
                        initRatingVars(rating);
                        if (rating.dataset.ajax) {
                        setRatingValue(ratingItem.value, rating);    
                        } else {
                        ratingValue.innerHTML = index + 1;
                        setRatingActiveWidth();
                        }
                    });
                }
            }
        }   

        // ---------------- slider ---------------------------------------------------

        function initSlider() {

            carSlider.forEach(item => {
                if(!item.classList.contains('active')) {
                    item.classList.remove('carousel', 'slide');
                };                    
            });
          }

        function resetActive() {
            ratings = document.querySelectorAll('.rating'),
            activeSlide = document.querySelector('.swiper-slide-active'),
            descr = document.querySelector('.swiper-slide-active .surfboards__item_descr'),
            feat = document.querySelector('.swiper-slide-active .surfboards__item_feat'),
            dimen = document.querySelector('.swiper-slide-active .surfboards__item_dimen'),
            itemsText = document.querySelectorAll('.swiper-slide-active .surfboards__text_item'),
            descrText = document.querySelector('.swiper-slide-active .item__descr_text'),
            featText = document.querySelector('.swiper-slide-active .item__feat_text'),
            dimenText = document.querySelector('.swiper-slide-active .item__dimen_text');                
        }

        function resetDecor() {
            setTimeout(() => {
                decor.forEach(item => {
                    item.classList.remove('active');
                });
                activeSlide.querySelector('.surfboards__text_decor').classList.add("active");
                decorActive = document.querySelector('.surfboards__text_decor.active');
            }, 1000);
        }

        btnPrev.addEventListener('click', () => {
            setTimeout(() => {
                carSlider.forEach(item => {
                    if(item.classList.contains("active")) {
                        item.classList.remove("active");
                    };
                });
                activeCarus = activeSlide.querySelector('.carslider');
                activeCarus.classList.add("active");
                initSlider();
                activeCarus.classList.add('carousel', 'slide');
                resetDecor();
            }, 50);        
        resetActive();
        textSwipe();
        });

        btnNext.addEventListener('click', () => {
            setTimeout(() => {
                carSlider.forEach(item => {
                    if(item.classList.contains("active")) {
                        item.classList.remove("active");
                    };
                });
                activeCarus = activeSlide.querySelector('.carslider');
                activeCarus.classList.add("active");
                initSlider();
                activeCarus.classList.add('carousel', 'slide');
                resetDecor();
            }, 50);            
            resetActive();
            textSwipe();
        });  

        // ---------------- text slider ---------------------------------------------------

        function resetAnim() {
            itemsText.forEach(item => {
                item.classList.remove('animate__fadeInRight', 'animate__fadeInLeft', 'animate__fadeOutRight', 'animate__fadeOutLeft');
            });
        }

        function textSwipe() {
            activeIndex = 1;
            descr.addEventListener('click', () => {


                if (featText.classList.contains("active")) {
                    resetAnim();
                    featText.classList.add('animate__fadeOutRight');
                    feat.classList.remove('active');
                    setTimeout(() => {
                    featText.classList.remove('active');
                    descrText.classList.add('active');
                    resetAnim();
                    descrText.classList.add('animate__fadeInLeft');
                    descr.classList.add('active');
                    activeIndex = 1;
                    decorActive.style.transform = "translate(0px)";
                    }, 500);
                } else {
                    if (dimenText.classList.contains("active")) {
                        resetAnim();
                        dimenText.classList.add('animate__fadeOutRight');
                        dimen.classList.remove('active');
                    setTimeout(() => {
                        dimenText.classList.remove('active');
                        descrText.classList.add('active');
                        resetAnim();
                        descrText.classList.add('animate__fadeInLeft');
                        descr.classList.add('active');
                        activeIndex = 1;
                        decorActive.style.transform = "translate(0px)";
                        }, 500);
                    }                
                }            
            });

            feat.addEventListener('click', () => {
                if (descrText.classList.contains("active")) {
                    resetAnim();
                    descrText.classList.add('animate__fadeOutLeft');
                    descr.classList.remove('active');
                    setTimeout(() => {
                    descrText.classList.remove('active');
                    featText.classList.add('active');
                    resetAnim();
                    featText.classList.add('animate__fadeInRight');
                    feat.classList.add('active');
                    activeIndex = 2;
                    decorActive.style.transform = "translate(7.125em)";
                    }, 500);
                } else {
                    if (dimenText.classList.contains("active")) {
                        resetAnim();
                        dimenText.classList.add('animate__fadeOutRight');
                        dimen.classList.remove('active');
                        setTimeout(() => {
                        dimenText.classList.remove('active');
                        featText.classList.add('active');
                        resetAnim();
                        featText.classList.add('animate__fadeInLeft');
                        feat.classList.add('active');
                        activeIndex = 2;
                        decorActive.style.transform = "translate(7.125em)"
                        }, 500);
                    }                
                }
            });

            dimen.addEventListener('click', () => {
                if (featText.classList.contains("active")) {
                    resetAnim();
                    featText.classList.add('animate__fadeOutLeft');
                    feat.classList.remove('active');
                    setTimeout(() => {
                    featText.classList.remove('active');
                    dimenText.classList.add('active');
                    resetAnim();
                    dimenText.classList.add('animate__fadeInRight');
                    dimen.classList.add('active');
                    activeIndex = 3;
                    decorActive.style.transform = "translate(13.875em)";
                    }, 500);
                } else {
                    if (descrText.classList.contains("active")) {
                    resetAnim();
                        descrText.classList.add('animate__fadeOutLeft');
                        descr.classList.remove('active');
                    setTimeout(() => {
                        descrText.classList.remove('active');
                        dimenText.classList.add('active');
                        resetAnim();
                        dimenText.classList.add('animate__fadeInRight');
                        dimen.classList.add('active');
                        activeIndex = 3;
                        decorActive.style.transform = "translate(13.875em)";
                        }, 500);
                    }                
                }            
            });
        }
        textSwipe();

        // modal video ----------------

        const videoPlay = document.querySelector('.about__main_play'),
              videoOverlay = document.querySelector('.modal__overlay'),
              videoClose = document.querySelector('.modal__close'),
              path = videoPlay.getAttribute('data-url'),
              scroll = calcScroll();

        function init() {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        };
        init();
        
        videoPlay.addEventListener("click", (e) => {
            e.preventDefault();
            if (document.querySelector('iframe#frame')) {
                videoOverlay.style.display = 'flex';
                document.body.classList.add("noscroll");
                document.body.style.marginRight = `${scroll}px`;
            } else {
                createPlayer(path);
                document.body.classList.add("noscroll");   
                document.body.style.marginRight = `${scroll}px`;
            }
        });


        videoClose.addEventListener("click", (e) => {
            e.preventDefault();
            setTimeout(() => {
                videoOverlay.style.display = 'none';
                player.stopVideo();
                document.body.classList.remove("noscroll");        
                document.body.style.marginRight = `0px`;
            }, 500);
        });        
        let player;
        function createPlayer(url) {
            player = new YT.Player('frame', {
                height: '100%',
                width: '100%',
                videoId: `${url}`,
                events: {
                  'onReady': onPlayerReady,
                }
            });
        }
        
        function onPlayerReady(event) {
            videoOverlay.style.display = 'flex';         
            event.target.playVideo();
          }

        function calcScroll() {
            let div = document.createElement("div");
            div.style.width = "50px";
            div.style.height = "50px";
            div.style.overflowY = "scroll";
            div.style.visibility = "hidden";
            document.body.appendChild(div);
            let scrollWidth = div.offsetWidth - div.clientWidth;
            div.remove();
            return scrollWidth;
        }

        // team slider ----------------

        const teamItem = document.querySelectorAll('.ourteam__item'),
              teamItemActive = document.querySelectorAll('.ourteam__item.active'),
              teamBtnPrev = document.querySelector('.ourteam__arrows_prev'),
              teamBtnNext = document.querySelector('.ourteam__arrows_next'),
              upBlock = document.querySelector('.updates');
              inx = 0;

              teamBtnPrev.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (inx === 0) {
                        teamItem.forEach(item => {
                            item.classList.add("goInLeft");
                        });
                        setTimeout(() => {
                            teamItemActive[0].classList.add("hide");
                            teamItemActive[0].classList.remove("active");
                            teamItem[6].classList.remove("hide");
                            teamItem[6].classList.add("active");
                        }, 700);
                        inx = inx - 1;
                    } else {
                        if (inx === -1) {
                            teamItem.forEach(item => {
                                item.classList.add("goInLeftDbl");
                                item.classList.remove("goInLeft");
                            });
                            setTimeout(() => {
                                teamItemActive[1].classList.add("hide");
                                teamItemActive[1].classList.remove("active");
            
                                teamItem[7].classList.remove("hide");
                                teamItem[7].classList.add("active");

                                teamBtnPrev.classList.add('nonactive');
                            }, 700);
                            inx = inx - 1;
                        }
                    };
                    if (inx === 2) {
                        teamItem.forEach(item => {
                            item.classList.add("goInRight");
                            item.classList.remove("goInRightDbl");
                        });
                        setTimeout(() => {
                            teamItemActive[2].classList.remove("hide");
                            teamItemActive[2].classList.add("active");
                            teamItem[0].classList.add("hide");
                            teamItem[0].classList.remove("active");
                            teamBtnNext.classList.remove('nonactive');
                        }, 700);
                        inx = inx - 1;
                    } else {
                        if (inx === 1) {
                            teamItem.forEach(item => {
                                item.classList.remove("goInRight");
                            });
                            setTimeout(() => {
                                teamItemActive[3].classList.remove("hide");
                                teamItemActive[3].classList.add("active");
    
            
                                teamItem[1].classList.add("hide");
                                teamItem[1].classList.remove("active");
    
                            }, 700);
                            inx = inx - 1;
                        }
                    }
              });     

              teamBtnNext.addEventListener('click', (e) => {
                e.preventDefault();
                if (inx === 0) {
                    teamItem.forEach(item => {
                        item.classList.add("goInRight");
                    });
                    setTimeout(() => {
                        teamItemActive[3].classList.add("hide");
                        teamItemActive[3].classList.remove("active");
                        teamItem[1].classList.remove("hide");
                        teamItem[1].classList.add("active");
                    }, 700);
                    inx = inx + 1;
                } else {
                    if (inx === 1) {
                        teamItem.forEach(item => {
                            item.classList.add("goInRightDbl");
                            item.classList.remove("goInRight");
                        });
                        setTimeout(() => {
                            teamItemActive[2].classList.add("hide");
                            teamItemActive[2].classList.remove("active");
                            teamItem[0].classList.remove("hide");
                            teamItem[0].classList.add("active");
                            teamBtnNext.classList.add('nonactive');
                        }, 700);
                        inx = inx + 1;
                    }
                };
                if (inx === -2) {
                    teamItem.forEach(item => {
                        item.classList.add("goInLeft");
                        item.classList.remove("goInLeftDbl");
                    });
                    setTimeout(() => {
                        teamItemActive[1].classList.remove("hide");
                        teamItemActive[1].classList.add("active");
                        teamItem[7].classList.add("hide");
                        teamItem[7].classList.remove("active");
                        teamBtnPrev.classList.remove('nonactive');
                    }, 700);
                    inx = inx + 1;
                } else {
                    if (inx === -1) {
                        teamItem.forEach(item => {
                            item.classList.remove("goInLeft");
                        });
                        setTimeout(() => {
                            teamItemActive[0].classList.remove("hide");
                            teamItemActive[0].classList.add("active");
                            teamItem[6].classList.add("hide");
                            teamItem[6].classList.remove("active");
                        }, 700);
                        inx = inx + 1;
                    }
                }                
          });

        // updates ----------------

        const updatesBtn = document.querySelector('.updates__main_button'),
              updatesExtra = document.querySelectorAll('.updates__main_item.extra');

              updatesBtn.addEventListener('click', (e) => {
                e.preventDefault();
                updatesBtn.classList.add('hide');
                setTimeout(() => {
                upBlock.classList.add('short');
                    updatesExtra.forEach(item => {
                        item.style.display = 'flex';
                        setInterval(() => {
                        item.classList.add('animate');
                        }, 200);
                    });
                }, 700);
              });

        // form ----------------

    const forms = (state) => {
        const form = document.querySelectorAll('.footer__subscribe_form'),
              wrapper = document.querySelector('.footer__subscribe_wrapper'),
              input = document.querySelectorAll('.footer__subscribe_input');
        message = {
            loading: "Loading...",
            success: "Thanks! We will keep in touch",
            failure: "Something going wrong..."
        };
        const clearInput = () => {
            input.forEach(item => {
                item.value = "";
            });
        };
        clearInput();
        const postData = async (url, data) => {
            let res = await fetch(url, {
                method: "POST",
                body: data
            });
            return await res.text();
        };
        form.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();
                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                font-family: 'RobotoCondensed', sans-serif;
                font-size: 26px;
                font-weight: 400;
                letter-spacing: 2px;
                color: #fff;
                margin: auto 100px;
                `;
                wrapper.appendChild(statusMessage);
                statusMessage.textContent=message.loading;
                const formData = new FormData(item);
                postData('./server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent=message.success;
                })
                .catch(() => {
                    statusMessage.textContent=message.failure;
                })
                .finally(() => {
                    clearInput();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });                    
            });
        });
    };

    let modalState = {};
    forms(modalState);
});

$(document).ready(function(e) {

    // button ----------------
    $('.surfboards__order, .updates__btn').on('mouseenter', function(e) {
        x = e.pageX - $(this).offset().left;
        y = e.pageY - $(this).offset().top;
        $(this).find('span').css({top:y, left:x})
    })
    $('.surfboards__order, .updates__btn').on('mouseout', function(e) {
        x = e.pageX - $(this).offset().left;
        y = e.pageY - $(this).offset().top;
        $(this).find('span').css({top:y, left:x})
    })
});