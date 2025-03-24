import React from 'react'

const Category = () => {
    return (
        <>
            <section className="section-categories padding-b-100">
                <div className="container">
                    <div className="row mb-minus-24">
                        <div className="col-lg-4 col-12 mb-24">
                            <div className="cr-categories">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active center-categories-inner link_text" id="cake_milk-tab" data-bs-toggle="tab" data-bs-target="#cake_milk" type="button" role="tab" aria-controls="cake_milk" aria-selected="true">
                                            Bowling
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link center-categories-inner link_text" id="meat-tab" data-bs-toggle="tab" data-bs-target="#meat" type="button" role="tab" aria-controls="meat" aria-selected="false" tabIndex={-1}>
                                            Foosball
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link center-categories-inner link_text" id="Vegetables-tab" data-bs-toggle="tab" data-bs-target="#Vegetables" type="button" role="tab" aria-controls="Vegetables" aria-selected="false" tabIndex={-1}>
                                            Pool (Billiards)
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link center-categories-inner link_text" id="Custard-tab" data-bs-toggle="tab" data-bs-target="#Custard" type="button" role="tab" aria-controls="Custard" aria-selected="false" tabIndex={-1}>
                                            Table Tennis
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link center-categories-inner link_text" id="Strawberry-tab" data-bs-toggle="tab" data-bs-target="#Strawberry" type="button" role="tab" aria-controls="Strawberry" aria-selected="false" tabIndex={-1}>
                                            Air Hockey
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link center-categories-inner link_text" id="kabaddi-tab" data-bs-toggle="tab" data-bs-target="#kabaddi" type="button" role="tab" aria-controls="kabaddi" aria-selected="false" tabIndex={-1}>
                                           Darts
                                        </button>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-8 col-12 mb-24">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade active show" id="cake_milk" role="tabpanel" aria-labelledby="cake_milk-tab">
                                    <div className="row mb-minus-24">
                                        <div className="col-6 cr-categories-box mb-24">
                                            <div className="cr-side-categories">
                                                <img src="assets/img/product/DALL·E 2025-03-11 20.30.41 - A lively bowling alley scene with people playing and cheering. Bright neon lights reflect off the polished wooden lanes as a player rolls a bowling ba.jpg" style={{ height: "475px", width: "475px" }} alt="categories-3" />
                                            </div>
                                        </div>
                                        <div className="col-6 cr-categories-box mb-24">
                                            <div className="cr-side-categories">
                                                <img src="assets/img/product/DALL·E 2025-03-11 20.30.45 - A close-up view of a bowling ball rolling down the lane towards the pins. The polished surface reflects the vibrant lights of the bowling alley. The p.jpg" style={{ height: "475px", width: "475px" }} alt="categories-3" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="meat" role="tabpanel" aria-labelledby="meat-tab">
                                    <div className="row mb-minus-24">
                                        <div className="col-6 cr-categories-box">
                                            <div className="cr-side-categories">
                                                <img src="assets/img/product/DALL·E 2025-03-11 20.30.50 - A top-down view of an exciting foosball match in progress. Players grip the rods tightly, controlling their miniature soccer players as the ball moves.jpg" style={{ height: "475px", width: "475px" }} alt="categories-3" />
                                            </div>
                                        </div>
                                        <div className="col-6 cr-categories-box">
                                            <div className="cr-side-categories">
                                                <img src="assets/img/product/DALL·E 2025-03-11 20.30.53 - A close-up of hands gripping the foosball rods, controlling the miniature soccer players. The foosball ball is in motion, creating an intense and comp.jpg" style={{ height: "475px", width: "475px" }} alt="categories-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="Vegetables" role="tabpanel" aria-labelledby="Vegetables-tab">
                                    <div className="row mb-minus-24">
                                        <div className="col-6 cr-categories-box mb-24">
                                            <div className="cr-side-categories">
                                                <img src="assets/img/product/DALL·E 2025-03-11 20.30.57 - A group of players engaged in a competitive game of pool (billiards) in a game zone. The scene is set in a stylish indoor gaming area with bright ligh.jpg" style={{ height: "475px", width: "475px" }} alt="categories-5" />
                                            </div>
                                        </div>
                                        <div className="col-6 cr-categories-box mb-24">
                                            <div className="cr-side-categories">
                                                <img src="assets/img/product/DALL·E 2025-03-11 20.31.00 - A close-up shot of a cue stick aiming at the 8-ball in a game of pool. The green felt table contrasts with the glossy billiard balls. The focus is on .jpg" style={{ height: "475px", width: "475px" }} alt="categories-6" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="Custard" role="tabpanel" aria-labelledby="Custard-tab">
                                    <div className="row mb-minus-24">
                                        <div className="col-6 cr-categories-box mb-24">
                                            <div className="cr-side-categories">
                                                <img src="assets/img/product/DALL·E 2025-03-11 20.32.44 - Two players competing in a game of table tennis in a game zone. The scene is energetic, with one player preparing to return a fast serve. The table ha.jpg" style={{ height: "475px", width: "475px" }} alt="categories-7" />
                                            </div>
                                        </div>
                                        <div className="col-6 cr-categories-box mb-24">
                                            <div className="cr-side-categories">
                                                <img src="assets/img/product/DALL·E 2025-03-11 20.32.47 - A close-up of a table tennis paddle hitting the ball during an intense match. The ball is captured mid-air, just before it bounces on the table. The s.jpg" style={{ height: "475px", width: "475px" }} alt="categories-8" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="Strawberry" role="tabpanel" aria-labelledby="Strawberry-tab">
                                    <div className="row mb-minus-24">
                                        <div className="col-6 cr-categories-box mb-24">
                                            <div className="cr-side-categories">

                                                <img src="assets/img/product/DALL·E 2025-03-11 20.33.00 - A close-up of an air hockey puck gliding across the smooth surface of the table. The bright lights reflect off the table, emphasizing the speed and ex.jpg" style={{ height: "475px", width: "475px" }} alt="categories-9" />
                                            </div>
                                        </div>
                                        <div className="col-6 cr-categories-box mb-24">
                                            <div className="cr-side-categories">

                                                <img src="assets/img/product/DALL·E 2025-03-11 20.33.05 - Players in action at an air hockey table, hitting the puck with fast-paced movements. The table is illuminated with bright LED lights, creating a futu.jpg" style={{ height: "475px", width: "475px" }} alt="categories-10" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="kabaddi" role="tabpanel" aria-labelledby="kabaddi-tab">
                                    <div className="row mb-minus-24">
                                        <div className="col-6 cr-categories-box mb-24">
                                            <div className="cr-side-categories">
                                            <img src="assets/img/product/DALL·E 2025-03-11 20.33.00 - A close-up of an air hockey puck gliding across the smooth surface of the table. The bright lights reflect off the table, emphasizing the speed and ex.jpg" style={{ height: "475px", width: "475px" }} alt="categories-9" />
                                            </div>                                            
                                        </div>
                                        <div className="col-6 cr-categories-box mb-24">
                                            <div className="cr-side-categories">
                                                <img src="assets/img/product/DALL·E 2025-03-11 20.33.05 - Players in action at an air hockey table, hitting the puck with fast-paced movements. The table is illuminated with bright LED lights, creating a futu.jpg" style={{ height: "475px", width: "475px" }} alt="categories-10" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section >
        </>
    )
}

export default Category
