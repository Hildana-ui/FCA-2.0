interface NotFoundPageProps {
    page: string
}


function NotFoundPage({ page }:NotFoundPageProps) {
    return (
        <div> {page} Not Found. </div>
    )
}

export default NotFoundPage;