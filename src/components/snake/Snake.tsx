import React from "react"
interface ComponentProps {
    snakeDots: number[][];
}
export default (props: ComponentProps) => {
    return (
        <div>
            {
                props.snakeDots.map((dot, i) => {
                    const style = {
                        left: `${dot[0]}%`,
                        top: `${dot[1]}%`
                    }
                    return (
                        <div className="snake-dot" key={i} style={style}></div>
                    )
                })
            }
        </div>


    )
}