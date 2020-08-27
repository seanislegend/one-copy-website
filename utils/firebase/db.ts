import admin, {firestore} from '@/utils/firebase/admin';

interface RegisterEmail {
    ip: string;
    email: string;
}

export const registerEmail = (data: RegisterEmail): Promise<any> => {
    return firestore.collection('registration').add({
        created_at: admin.firestore.FieldValue.serverTimestamp(),
        email: data.email,
        ip: data.ip
    });
};

export const hasEmailRegistered = (email: string): Promise<any> => {
    return new Promise(
        async (resolve, reject): Promise<any> => {
            try {
                const isRegistered = await firestore
                    .collection('registration')
                    .where('email', '==', email)
                    .get();

                if (isRegistered.empty) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            } catch (error) {
                reject(error.essage);
            }
        }
    );
};
