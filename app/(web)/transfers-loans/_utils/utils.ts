 export const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
      case "APPROVED":
      case "COMPLETED":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20";
      case "PENDING":
        return "text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/20";
      case "REJECTED":
      case "CANCELLED":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20";
    }
  };

  export const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      ACTIVE: "Actif",
      COMPLETED: "Terminé",
      CANCELLED: "Annulé",
      PENDING: "En attente",
      APPROVED: "Approuvé",
      REJECTED: "Rejeté",
      PERMANENT: "Permanent",
      TEMPORARY: "Temporaire",
    };
    return statusMap[status] || status;
  };