import prisma from "../db/db";


export async function calculateReview(req,res) {
    try {
        const { cardId, result } = req.body;
        const card_id = Number(cardId);
        const type = ["RETRY", "SCHEDULED", "MANUAL"];
        const now = new Date();
        


        if (result !== "CORRECT" && result !== "WRONG") {
            return res.status(400).json({
                error: "Result must be either correct or wrong."
            });
        }


        if (!Number.isInteger(card_id) || card_id <= 0) {
            return res.status(400).json({
                error: "Card ID must be a positive integer."
            });
        }


        //Find Card
        const card = await prisma.card.findUnique({
            where: { id: card_id }
        });

        //Check if the card exists
        if (!card) {
            return res.status(404).json({
                error: "Card ID does not exist."
            });
        }

        //Find recent review record
        const review = await prisma.review.findFirst({
            where: { card_id },
            orderBy: { reviewed_at: "desc"}
        })

        //Find recent review history with a scheduled date
        const scheduleAnchor = await prisma.review.findFirst({
            where: {
                card_id,
                next_review_at: { not: null }
            },
            orderBy: { reviewed_at: "desc" }
        })

        const isDue = scheduleAnchor
            ? now >= scheduleAnchor.next_review_at
            : false;

        


         if (!review && result === "CORRECT") {
            const nextReview = new Date(now);
            nextReview.setDate(nextReview.getDate() + 1);

            const data = await createReview(
                card_id,
                result,
                type[2],
                nextReview
            );

            return res.status(201).json({
                message: "Created first card review.",
                data
            });
        } 
        
        //Retry Review Logic
        //For every wrong answer the review time increments by 1 min, 5mins, 10mins then by a day
        if (result === "WRONG") {

            const wrongHistory = await prisma.review.findMany({
                where: { card_id, result, type: type[0] }
            })

            const nextReview = new Date(now);

            if (wrongHistory.length === 0) {
                nextReview.setMinutes(nextReview.getMinutes() + 1);
            } else if (wrongHistory.length === 1) {
                nextReview.setMinutes(nextReview.getMinutes() + 5);
            } else if (wrongHistory.length === 2) {
                nextReview.setMinutes(nextReview.getMinutes() + 10);
            } else {
                nextReview.setDate(nextReview.getDate() + 1);
            }

            const data = await createReview(
                card_id,
                result,
                type[0],
                nextReview
            );

            return res.status(201).json({
                message: "Retry review created successfully.",
                data
            });
        }
        
        

        //Scheduled Review Logic
        if (result === "CORRECT") {
        
             // record the review as MANUAL without changing its schedule.
            if (!isDue || card.status === "CONFIDENT") {
                const data = await createReview(
                    card_id,
                    result,
                    type[2],
                    null
                );

                return res.status(201).json({
                    message: "Manual review created successfully.",
                    data
                });
            }    

            const correctHistory = await prisma.review.findMany({
                where: { card_id, result, type: type[1] }
            })

            //If a card is correctly answered 10 times it is moved to confident status
            // Nine previous correct scheduled reviews means
            // this due review will be the tenth.
            if (correctHistory.length >= 9) {
                
                const data = await createReview(card_id, result, type[1], null);

                
                const updateCard = await prisma.card.update({
                    where: { id: card_id},
                    data: {
                        status: "CONFIDENT"
                    }
                })

                return res.status(200).json({
                    message: "Card is now CONFIDENT.",
                    data,
                    updateCard
                })  
            }

            const nextReview = new Date(now);

            if (correctHistory.length === 0) {
                 nextReview.setDate(nextReview.getDate() + 1);
            } else {
                nextReview.setDate(nextReview.getDate() + 3);
            }

            const data = await createReview(
                card_id,
                result,
                type[1],
                nextReview
            );

            return res.status(201).json({
                message: "Scheduled review created successfully.",
                data
            });
        }
    } catch(err){
         //Card ID may not exist for the review that's being created
        console.error("Calculate review error:", err);

        return res.status(500).json({
            error: "Failed to create review."
        });
    }
}



//Create review

export async function createReview(card_id, result, type, next_review_at) {
   
    return await prisma.review.create({
        data: {
            card_id,
            result,
            type,
            next_review_at   
        }
    });    
}