function InstallNotice() {
    return (
        <div className='flex justify-center bg-yellow py-2 '>
            <p className='text-xl text-black'>
                Please Install 
                <a 
                    className='ml-2 text-sky-600 underline' 
                    href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko'
                >
                    Metamask
                </a>
            </p>
        </div>
    );
}

export default InstallNotice;