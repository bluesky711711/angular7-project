import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class SeoService {

    constructor(private meta: Meta,
        private titleService: Title) { }

    generateTags(tags) {
        // default values
        tags = {
            title: 'Piensa Digital - Noticias y contenido de calidad sobre economía digital, emprendimiento y más...',
            // tslint:disable-next-line:max-line-length
            description: 'Piensa Digital es la plataforma para leer y compartir contenido sobre economía, cultura y transformación digital en Latinoamérica',
            // tslint:disable-next-line:max-line-length
            image: 'https://firebasestorage.googleapis.com/v0/b/piensadigital-produccion.appspot.com/o/utils%2Flogo_externo.jpg?alt=media&token=a84fcf2d-b3de-4c2c-93fb-07e8a5a83744',
            slug: '',
            ...tags
        };

        // Set a title
        this.titleService.setTitle(tags.title + ' - Piensa Digital');

        // Set meta tags
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:site', content: '@piensadigital' });
        this.meta.updateTag({ name: 'twitter:title', content: tags.title });
        this.meta.updateTag({ name: 'twitter:description', content: tags.description });
        this.meta.updateTag({ name: 'twitter:image', content: tags.image });

        this.meta.updateTag({ property: 'og:type', content: 'article' });
        this.meta.updateTag({ property: 'og:site_name', content: 'Piensa Digital' });
        this.meta.updateTag({ property: 'og:title', content: tags.title });
        this.meta.updateTag({ property: 'og:description', content: tags.description });
        this.meta.updateTag({ property: 'og:image', content: tags.image });
        this.meta.updateTag({ property: 'og:image:width', content:  '400'});
        this.meta.updateTag({ property: 'og:image:height', content: '400' });
        this.meta.updateTag({ property: 'og:image:alt', content: 'Piensa Digital' });
        this.meta.updateTag({ property: 'fb:app_id', content: '531034137311439' });
        this.meta.updateTag({ property: 'og:url', content: `https://piensadigital.co/${tags.slug}` });
        // this.meta.updateTag({ property: 'og:url', content: `https://piensadigital-desarrollo.firebaseapp.com/${tags.slug}` });
    }

}
