import * as pageSections from "./hobbiesPages/HobbiesExports"

const Hobbies = () => {
    return (
        <div className="Hobbies">
            <pageSections.Context />
            <pageSections.Blacksmithing />
            <pageSections.Machining />
            <pageSections.Woodworking />
            <pageSections.Calligraphy />
            <pageSections.Keyboards />
            <pageSections.Outdoors />
            <pageSections.Gaming />
        </div>
    )
}

export default Hobbies;