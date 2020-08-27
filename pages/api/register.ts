import {NextApiRequest, NextApiResponse} from 'next';
import {validate} from 'email-validator';
import {hasEmailRegistered, registerEmail} from '@/utils/firebase/db';
import copy from '@/locales/en-api.json';
import {getIp} from '@/utils/network';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.body.email) {
        if (validate(req.body.email)) {
            try {
                const hasRegistered = await hasEmailRegistered(req.body.email);

                if (!hasRegistered) {
                    await registerEmail({email: req.body.email, ip: getIp(req)});

                    res.status(200).json({success: true});
                } else {
                    res.status(200).json({success: true});
                }
            } catch (error) {
                res.status(400).json({error: error.message});
            }
        } else {
            res.status(400).json({error: copy.register.email_invalid});
        }
    } else {
        res.status(400).json({error: copy.register.email_empty});
    }
};

export default handler;
