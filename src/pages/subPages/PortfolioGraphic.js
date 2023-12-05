import * as pageSections from "./portfolioGraphicPages/PortfolioGraphicExports"

const PortfolioGraphic = () => {
    return (
        <div className="portfolioGraphic">
            <pageSections.BackgroundGraphic />
            <pageSections.PinnacleGraphic />
            <pageSections.BearFight />
            <pageSections.Astorian />
            <pageSections.ChineseAssociation />
        </div>
    )
}

export default PortfolioGraphic