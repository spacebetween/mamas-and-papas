'use strict';

const svgSprite = {
    svg_sprite: {
        expand: true,
        src: ['media/svgs/*.svg'],
        dest: '',

        options: {
            shape: {
                id: {
                    generator: (name) => {
                        return `icon-${name.split('/').pop().split('.')[0].toLowerCase()}`;
                    }
                }
            },
            mode: {
                css: {
                    dest: 'css/',
                    sprite: '../media/shared/sprite.svg',
                    dimensions: true,
                    prefix: '.',
                    render: {
                        scss: {
                            dest: '../src/css/components/_icons.scss'
                        }
                    }
                }
            }
        }
    }
};

module.exports = svgSprite;
