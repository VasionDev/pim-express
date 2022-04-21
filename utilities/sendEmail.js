const nodemailer = require("nodemailer");

const getEmailResetTemplate = (userName, resetLink) => {
    return `
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable">
	<tbody>
		<tr>
			<td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell">
				<table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperWebview" style="max-width:600px; margin:40px 0 20px;">
					<tbody>
						<tr>
							<td align="center" valign="top">
                                <img src="https://mypruvit.com/style-guide/pruvit-cms/assets/images/PruvitCMS-logo.png" alt="img" />
							</td>
						</tr>
					</tbody>
				</table>
				<table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px; margin-bottom:60px;">
					<tbody>
						<tr>
							<td align="center" valign="top">
								<table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff; border-color:#e5e5e5; border-style:solid; border-width:0 1px 1px 1px;">
									<tbody>
										<tr>
											<td style="background-color:#2152ff;font-size:1px;line-height:3px" class="topBorder" height="4">&nbsp;</td>
										</tr>
										<tr>
											<td style="padding:80px 40px 0;" align="center" valign="top" class="mainTitle">
												<h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0">Hi <strong>${userName}</strong></h2>
											</td>
										</tr>
										<tr>
											<td style="padding:15px 40px 25px;" align="center" valign="top" class="subTitle">
												<h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0">You have requested to reset your password</h4>
											</td>
										</tr>
										<tr>
											<td style="padding:0px 40px 0;" align="center" valign="top" class="containtTable ui-sortable">
												<table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style="">
													<tbody>
														<tr>
															<td style="padding:0 20px 20px;" align="center" valign="top" class="description">
																<p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">We cannot simply send you your old password. A unique link to reset your password has been generated for you. To reset your password, click the following link and follow the instructions.</p>
															</td>
														</tr>
													</tbody>
												</table>
												<table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton" style="">
													<tbody>
														<tr>
															<td style="padding:20px 40px 80px;" align="center" valign="top">
																<table border="0" cellpadding="0" cellspacing="0" align="center">
																	<tbody>
																		<tr>
																			<td style="background-color: #2152ff; padding: 12px 40px; border-radius: 50px;" align="center" class="ctaButton"> <a href="${resetLink}" style="color:#fff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;font-style:normal;letter-spacing:1px;line-height:20px;text-transform:uppercase;text-decoration:none;display:block" target="_blank" class="text">Reset Password</a>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
								
							</td>
						</tr>
					</tbody>
				</table>
				
			</td>
		</tr>
	</tbody>
</table>`;
}

const getEmailInvitationTemplate = (userName, resetLink) => {
    return `
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable">
	<tbody>
		<tr>
			<td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell">
				<table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperWebview" style="max-width:600px; margin:40px 0 20px;">
					<tbody>
						<tr>
							<td align="center" valign="top">
                                <img src="https://mypruvit.com/style-guide/pruvit-cms/assets/images/PruvitCMS-logo.png" alt="img" />
							</td>
						</tr>
					</tbody>
				</table>
				<table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px; margin-bottom:60px;">
					<tbody>
						<tr>
							<td align="center" valign="top">
								<table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff; border-color:#e5e5e5; border-style:solid; border-width:0 1px 1px 1px;">
									<tbody>
										<tr>
											<td style="background-color:#2152ff;font-size:1px;line-height:3px" class="topBorder" height="4">&nbsp;</td>
										</tr>
										<tr>
											<td style="padding:80px 40px 0;" align="center" valign="top" class="mainTitle">
												<h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0">Hi <strong>${userName}</strong></h2>
											</td>
										</tr>
										<tr>
											<td style="padding:15px 40px 25px;" align="center" valign="top" class="subTitle">
												<h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0">You have requested to confirm your invitation</h4>
											</td>
										</tr>
										<tr>
											<td style="padding:0px 40px 0;" align="center" valign="top" class="containtTable ui-sortable">
												<table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style="">
													<tbody>
														<tr>
															<td style="padding:0 20px 20px;" align="center" valign="top" class="description">
																<p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">We cannot simply set your information. A unique link to set your information has been generated for you. To confirm your invitation, click the following link and follow the instructions.</p>
															</td>
														</tr>
													</tbody>
												</table>
												<table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton" style="">
													<tbody>
														<tr>
															<td style="padding:20px 40px 80px;" align="center" valign="top">
																<table border="0" cellpadding="0" cellspacing="0" align="center">
																	<tbody>
																		<tr>
																			<td style="background-color: #2152ff; padding: 12px 40px; border-radius: 50px;" align="center" class="ctaButton"> <a href="${resetLink}" style="color:#fff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;font-style:normal;letter-spacing:1px;line-height:20px;text-transform:uppercase;text-decoration:none;display:block" target="_blank" class="text">Confirm Invitation</a>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
								
							</td>
						</tr>
					</tbody>
				</table>
				
			</td>
		</tr>
	</tbody>
</table>`;
}

const sendEmail = async (email, subject, userName='', link, inInvitation=false) => {
    return new Promise((resolve, reject) =>{
        try {
            const transporter = nodemailer.createTransport({
                service: process.env.EMAIL_SERVICE,
                auth: {
                    type: 'OAUTH2',
                    user: process.env.SYSTEM_SENDER,
                    clientId: process.env.GMAIL_CLIENT_ID,
                    clientSecret: process.env.GMAIL_CLIENT_SECRET,
                    refreshToken: process.env.GMAIL_REFRESH_TOKEN
                },
            });

            transporter.sendMail({
                from: process.env.SYSTEM_SENDER,
                to: email,
                subject: subject,
                text: link,
                html: inInvitation ? getEmailInvitationTemplate(userName, link) : getEmailResetTemplate(userName, link)
            }, (err, info)=> {
                if(err) {
                    resolve(false);
                }else {
                    resolve(true);
                }
            }); 
        } catch (error) {
            resolve(false);
        }
    })
}

module.exports = sendEmail;