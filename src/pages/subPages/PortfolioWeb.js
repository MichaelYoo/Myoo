import * as pageSections from "./portfolioWebPages/PortfolioWebExports"

const PortfolioWeb = () => {
    return (
        <div className="portfolioWeb">
            <pageSections.BackgroundWeb />
            <pageSections.PinnacleWeb />
            <pageSections.Curators />
            <pageSections.CATT />
            <pageSections.PLAT />
        </div>
    )
}

export default PortfolioWeb