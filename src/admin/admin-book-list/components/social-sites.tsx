import React, { useState } from 'react';
import tikTok from 'assets/images/icons/tiktok.png';

interface ISites {
    facebook: string;
    instagram: string;
    linkedin: string;
    tiktok: string;
    twitter: string;
}

interface IThisProps {
    socSites: ISites;
    useEdit: boolean;
    onChange: any;
}

const sitesObj: ISites | any = {
    facebook: 'facebook',
    instagram: 'instagram',
    linkedin: 'linkedin',
    tiktok: 'tiktok',
    twitter: 'twitter'
};

function SocialSites({ socSites, useEdit, onChange }: IThisProps) {
    const [sites, setSites] = useState<ISites | any>(socSites);
    const [changesSite, setChangesSite] = useState<string>('');

    function editSite(key: any, value: string) {
        const _sites = { ...sites };
        _sites[key] = value;
        setSites(_sites);
        onChange(_sites);
    }

    function printEditAndAdd(key: string) {
        return (
            <>
                <span>
                    {changesSite === sitesObj[key] ? (
                        <div className="d-flex justify-content-start align-items-center">
                            <input
                                type="text"
                                className="add-site-input"
                                defaultValue={sites[key]}
                                onChange={(e: any) =>
                                    editSite(sitesObj[key], e.target.value)
                                }
                                placeholder="Site URL"
                            />
                            <i
                                className="fas fa-plus ml-2 c-red cursor-pointer"
                                onClick={() => setChangesSite('')}
                            />
                        </div>
                    ) : sites[key] !== '' ? (
                        <a href={sites[key]} target="_blank" rel="noreferrer">
                            {sites[key]}
                        </a>
                    ) : !useEdit ? (
                        <span
                            className="cursor-pointer"
                            onClick={() => setChangesSite(sitesObj[key])}>
                            Add
                            <i className="fas fa-plus ml-2 c-red cursor-pointer" />
                        </span>
                    ) : (
                        <span className="c-gray">None</span>
                    )}
                </span>
                {!useEdit &&
                    changesSite !== sitesObj[key] &&
                    sites[key] !== '' && (
                        <i
                            className="fas fa-pen ml-2 mr-2 c-red cursor-pointer"
                            onClick={() => setChangesSite(sitesObj[key])}
                        />
                    )}
            </>
        );
    }
    return (
        <div>
            <div className="d-flex justify-content-start align-items-center mt-3">
                <i
                    className="fab fa-facebook-square mr-2 fs25"
                    style={{
                        color: '#4267B2'
                    }}
                />
                {printEditAndAdd(sitesObj.facebook)}
            </div>
            <div className="d-flex justify-content-start align-items-center mt-2">
                <i
                    className="fab fa-twitter-square mr-2 fs25"
                    style={{
                        color: '#1DA1F2'
                    }}
                />
                {printEditAndAdd(sitesObj.twitter)}
            </div>
            <div className="d-flex justify-content-start align-items-center mt-2">
                <i
                    className="fab fa-linkedin mr-2 fs25"
                    style={{
                        color: '#006192'
                    }}
                />
                {printEditAndAdd(sitesObj.linkedin)}
            </div>
            <div className="d-flex justify-content-start align-items-center mt-2">
                <i
                    className="fab fa-instagram mr-2 fs25"
                    style={{
                        color: '#C13584'
                    }}
                />
                {printEditAndAdd(sitesObj.instagram)}
            </div>
            <div className="d-flex justify-content-start align-items-center mt-2">
                <img
                    src={tikTok}
                    alt="TikTok Icon"
                    className="mr-2"
                    width={22}
                />
                {printEditAndAdd(sitesObj.tiktok)}
            </div>
        </div>
    );
}

export default SocialSites;
