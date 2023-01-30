import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const firstHabitId = 'df6335fe-a035-11ed-a8fc-0242ac120002'
const firstHabitCeationDate = new Date('2022-12-31T03:00:00.000')

const secondHabitId = '24ddfaba-a036-11ed-a8fc-0242ac120002'
const secondHabitCeationDate = new Date('2023-01-01T01:00:00.000')

const thirdHabitId = '518a39fc-a036-11ed-a8fc-0242ac120002'
const thirdHabitCeationDate = new Date('2023-01-01T01:00:00.000')

async function main() {
    await prisma.habit.deleteMany()
    await prisma.day.deleteMany()

    await Promise.all([

        prisma.habit.create({
            data: {
                id: firstHabitId,
                title: 'Beber 2L de agua.',
                created_at: firstHabitCeationDate,
                weekDays: {
                    create: [
                        { week_day: 1 },
                        { week_day: 2 },
                        { week_day: 3 },
                    ]
                }
            }
        }),

        prisma.habit.create({
            data: {
                id: secondHabitId,
                title: 'Exercitar',
                created_at: secondHabitCeationDate,
                weekDays: {
                    create: [
                        { week_day: 1 },
                        { week_day: 2 },
                        { week_day: 3 },
                    ]
                }
            }
        }),

        prisma.habit.create({
            data: {
                id: thirdHabitId,
                title: 'Dormir 8h',
                created_at: thirdHabitCeationDate,
                weekDays: {
                    create: [
                        { week_day: 1 },
                        { week_day: 2 },
                        { week_day: 3 },
                    ]
                }
            }
        })
    ])

    await Promise.all([
        prisma.day.create({
            data: {
                date: new Date('2023-01-06T03:00:00.000'),
                dayHabit: {
                    create: {
                        habit_id: firstHabitId
                    }
                }
            }
        }),

        prisma.day.create({
            data: {
                date: new Date('2023-01-04T03:00:00.000'),
                dayHabit: {
                    create: [
                        { habit_id: firstHabitId },
                        { habit_id: secondHabitId },
                    ]
                }
            }
        }),
    ])
}

main()
    .then( async () => {
        await prisma.$disconnect() 
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })