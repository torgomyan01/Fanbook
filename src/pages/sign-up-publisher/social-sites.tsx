import React from 'react';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SocialSiteName = {
    facebook: 'Facebook',
    twitter: 'Twitter',
    linkedin: 'Linkedin',
    instagram: 'Instagram',
    tiktok: 'Tiktok'
};

export const socialSites = [
    {
        name: SocialSiteName.facebook,
        icon: (
            <i
                className="fab fa-facebook-square mx-2"
                style={{ color: '#4267B2' }}
            />
        )
    },
    {
        name: SocialSiteName.twitter,
        icon: (
            <i
                className="fab fa-twitter-square mx-2"
                style={{ color: '#1DA1F2' }}
            />
        )
    },
    {
        name: SocialSiteName.linkedin,
        icon: (
            <i className="fab fa-linkedin mx-2" style={{ color: '#2867B2' }} />
        )
    },
    {
        name: SocialSiteName.instagram,
        icon: (
            <i className="fab fa-instagram mx-2" style={{ color: '#C13584' }} />
        )
    },
    {
        name: SocialSiteName.tiktok,
        icon: (
            <FontAwesomeIcon
                icon={faTiktok}
                className="mx-2"
                style={{ color: '#010101' }}
            />
        )
    }
];
