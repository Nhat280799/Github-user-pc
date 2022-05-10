import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({children}) => {
    const [githubUser,setGithubUser] = useState(mockUser);
    const [repos,setRepos] = useState(mockRepos);
    const [followers,setFollowers] = useState(mockFollowers);
    //request loading
    const [requests, setRequests] = useState(0);
    const [loading,setIsLoading] = useState(false);
    //check rate 
    const checkRequests = () => {
        axios(`${rootUrl}/rate_limit`)
        .then((response) => response.json())
            .then(({data}) => {
                let {rate: {remaining}} = data;
                // remaining = 0;
                setRequests(remaining);

                if (remaining === 0) {
                    
                }
            })
            .catch(err => console.log(err))
    }

    //  error
    useEffect(checkRequests, [])
    return <GithubContext.Provider
    value={{githubUser,repos,followers,requests,}}>{children}</GithubContext.Provider>
};

export {GithubProvider,GithubContext};