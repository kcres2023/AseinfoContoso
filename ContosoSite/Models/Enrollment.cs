//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ContosoSite.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Enrollment
    {
        public int EnrollmentID { get; set; }
        public int CourseID { get; set; }
        public int StudentID { get; set; }
        public Nullable<int> GradeID { get; set; }
    
        public virtual Course Course { get; set; }
        public virtual Student Student { get; set; }
        public virtual Grade Grade1 { get; set; }
    }
}
