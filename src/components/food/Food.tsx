import React from "react"
interface ComponentProps {
    dots: number[]
}
export default (props: ComponentProps) => {
    const style = {
        left: `${props.dots[0]}%`,
        top: `${props.dots[1]}%`
    }
    return (
        <div className="snake-food" style={style}></div>
    )
}