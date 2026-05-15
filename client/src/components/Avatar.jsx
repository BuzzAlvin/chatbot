const Avatar = ({variant}) => {
    return (
        <>
            <img src="/OIRS LOGO.png" alt="Oirs logo" className={`${ variant === "messenger" ? "w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" : "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"} bg-white rounded-full p-1`} />
        </>
    )
}

export default Avatar;