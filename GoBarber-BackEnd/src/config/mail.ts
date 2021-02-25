interface IEmailConfig{
    driver: 'ethereal' | 'ses';
    default:{
        from:{
            email:'equipe@goBarber.com.br',
            name:'Provider'
        }
    }
}

export default{
    driver:process.env.MAIL_DRIVER || 'ethereal',
} as IEmailConfig;
