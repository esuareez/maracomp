// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../lib/dbConnect.js"
import Suplidor from "../../models/Suplidor.js"


export default async function handler(req, res) {
  await dbConnect()

  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const suplidor = new Suplidor(req.body)
        await suplidor.save()
        res.status(200).json({ success: true, data: suplidor })
      } catch (error) {
        res.status(400).json({ success: false, error})
      }
    default:
      res.status(400).json({ success: false, error: 'Metodo no soportado' })
  }

}
