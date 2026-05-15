  const getBotReply = (message) => {
  const text = message.toLowerCase();

  if (text.includes("tax")) {
    return "Tax is a compulsory levy paid to the government.";
  }

  if (text.includes("paye")) {
    return "PAYE means Pay As You Earn.";
  }

  return "Please contact Osun IRS for more information.";
};

export default getBotReply;