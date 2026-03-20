const Container = ({children , className}:{children:React.ReactNode , className:string}) => {
    return (
        <div className={`container mx-auto px-5 md:px-10 xl:px-15 ${className}`}>
            {children}
        </div>
    )
}
export default Container