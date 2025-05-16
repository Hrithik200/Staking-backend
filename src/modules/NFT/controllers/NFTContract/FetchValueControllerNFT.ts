import { Request, Response, } from "express";
import { ErrorMap } from "../../../../utils/ErrorHandler";
import { FetchValueServiceNFT } from "../../services/NFTContract/FetchValueServiceNFT";



export class FetchValueControllerNFT {
    static async nftData(req: Request, res: Response) {
        try {
            const nftData = await FetchValueServiceNFT.getNFTDetails();
            console.log("🚀 ~ :11 ~ FetchValueControllerNFT ~ nftData ~ nftData:", nftData);
            res.json({
                success: true,
                nftData: nftData
            });
        } catch (error: any) {
            const known = ErrorMap[error.message];
            const status = known?.status || error.statusCode || 500;
            const message = known?.message || error.message || "Something went wrong";
            res.status(status).json({ error: message });
        }
    }
    static async fetchRole(req:Request,res:Response){
        try {
            const getRoles= await FetchValueServiceNFT.getRoles();
            console.log("🚀 ~ :26 ~ FetchValueControllerNFT ~ fetchRole ~ dataRoles:", getRoles);
            res.json({
                success: true,
                getRoles: getRoles
            });
            
        } catch (error: any) {
            const known = ErrorMap[error.message];
            const status = known?.status || error.statusCode || 500;
            const message = known?.message || error.message || "Something went wrong";
            res.status(status).json({ error: message });
        }
    }
    static async fetchHasRole(req:Request,res:Response){
        try {
            const {from}=req.body;
            const getRoles= await FetchValueServiceNFT.getHasRole(from);
            console.log("🚀 ~ :26 ~ FetchValueControllerNFT ~ fetchRole ~ dataRoles:", getRoles);
            res.json({
                success: true,
                getRoles: getRoles
            });
            
        } catch (error: any) {
            const known = ErrorMap[error.message];
            const status = known?.status || error.statusCode || 500;
            const message = known?.message || error.message || "Something went wrong";
            res.status(status).json({ error: message });
        }
    }
} 