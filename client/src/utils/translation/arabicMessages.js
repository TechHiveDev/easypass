const arabicMessages = {
  menu: {
    User: "المستخدمين",
    Post: "المنشورات",
    inventory: "المخزون",
    Consumption: "الاستهلاك",
    Compound: "المجمع",
    Compounds: "المجمعات",
    UserCompound: "مستخدمين المجمع",
    Invitation: "الدعوات",
    Scan: "الكشوف",
    Device: "الاجهزة",
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  userMenu: {
    dark: "الوضع المعتم",
    light: "الوضع الفاتح",
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  resources: {
    user: {
      name: "مستخدمين |||| مستخدم",
      fields: {
        id: "الكود",
        name: "الاسم",
        userType: "الدور",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        permission: "الصلاحيات",
        info: "معلومات المستخدم",
        createdAt: "تاريخ الإنشاء",
        updatedAt: "تاريخ التعديل",
        phone: "رقم الهاتف",
        photoUrl: "الصورة",
      },
    },
    compound: {
      name: "مجمعات |||| مجمع",
      fields: {
        id: "الكود",
        name: "الاسم",
        location: "العنوان",
        logoUrl: "الصورة",
      },
    },
    userCompound: {
      name: "مستخدمين المجمع |||| مستخدم المجمع",
      fields: {
        id: "الكود",
        userId: "المستخدم",
        compoundId: "المجمع",
      },
    },
    invitation: {
      name: "دعوات |||| دعوة",
      fields: {
        id: "الكود",
        name: "الاسم",
        type: "النوع",
        notes: "الملاحظات",
        userId: "المستخدم",
        compoundId: "المجمع",
      },
    },
    scan: {
      name: "الكشوف |||| الكشف",
      fields: {
        id: "الكود",
        invitationId: "الدعوة",
        deviceId: "الجهاز",
      },
    },
    device: {
      name: "الاجهزة |||| الجهاز",
      fields: {
        id: "الكود",
        ip: "عنوان ال ip",
        compoundId: "المجمع",
      },
    },
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  ra: {
    action: {
      add_filter: "إضافة فلتر",
      add: "إضافة",
      back: "العودة",
      bulk_actions: "%{smart_count} العناصر المحددة",
      cancel: "إلغاء",
      clear_input_value: "إفراغ المدخلات",
      clone: "استنساخ",
      confirm: "تأكيد",
      create: "إنشاء",
      create_item: "إنشاء %{item}",
      delete: "حذف",
      edit: "تعديل",
      export: "تصدير",
      list: "قائمة",
      refresh: "إعادة تحميل",
      remove_filter: "إزالة هذا الفلتر",
      remove: "إزالة",
      save: "حفظ",
      search: "بحث",
      show: "عرض التفاصيل",
      sort: "فرز",
      undo: "تراجع",
      unselect: "الغاء التحديد",
      expand: "فرد",
      close: "اغلاق",
      open_menu: "افتح القائمة",
      close_menu: "اغلق القائمة",
    },
    boolean: {
      true: "نعم",
      false: "لا",
      null: "",
    },
    page: {
      create: "إنشاء %{name}",
      dashboard: "لوحة الإحصائيات",
      edit: "%{name} #%{id}",
      error: "هناك خطأ ما",
      list: "%{name}",
      loading: "جار التحميل",
      not_found: "غير موجود",
      show: "%{name} #%{id}",
      empty: "لا يوجد %{name} حتي الان",
      invite: "هل ترغب فى الاضافة ؟",
    },
    input: {
      file: {
        upload_several: "إسقاط بعض الملفات للتحميل، أو انقر لتحديد واحد.",
        upload_single: "إسقاط ملف للتحميل، أو انقر لتحديده.",
      },
      image: {
        upload_several: "قم بإسقاط بعض الصور للتحميل، أو انقر لتحديد واحدة.",
        upload_single: "إسقاط صورة للتحميل، أو انقر لتحديدها.",
      },
      references: {
        all_missing: "غير قادر على العثور على بيانات المراجع.",
        many_missing: "واحد على الأقل من المراجع المرتبطة لم تعد متوفرة.",
        single_missing: "المرجع المرتبط لم يعد يبدو متاحًا.",
      },
      password: {
        toggle_visible: "اخفاء الرقم السري",
        toggle_hidden: "اظهار الرقم السري",
      },
    },
    message: {
      about: "حول",
      are_you_sure: "هل أنت واثق؟",
      bulk_delete_content:
        "هل أنت متأكد أنك تريد حذف هذا %{name}? |||| هل أنت متأكد من أنك تريد حذف هذه العناصر%{smart_count}?",
      bulk_delete_title: "حذف %{name} |||| احذف عناصر%{smart_count}%{name}",
      delete_content: "هل أنت متأكد أنك تريد حذف هذا البند؟",
      delete_title: "حذف %{name} #%{id}",
      details: "تفاصيل",
      error: "حدث خطأ في التطبيق ولم يمكن إكمال طلبك.",
      invalid_form: "النموذج غير صالح. يرجى التحقق من وجود أخطاء",
      loading: "يتم تحميل الصفحة، فقط لحظة من فضلك",
      no: "لا",
      not_found: "الصفحة غير موجودة",
      yes: "نعم ",
      unsaved_changes:
        "لم يتم حفظ بعض تغييراتك. هل أنت متأكد أنك تريد تجاهلها؟",
    },
    navigation: {
      no_results: "لا توجد نتائج",
      no_more_results: "رقم الصفحة%{page} خارج الحدود. جرب الصفحة السابقة.",
      page_out_of_boundaries: "رقم الصفحة%{page} خارج الحدود",
      page_out_from_end: "لا يمكن الذهاب بعد الصفحة الأخيرة",
      page_out_from_begin: "لا يمكن الذهاب قبل الصفحة الأولى",
      page_range_info: "%{offsetBegin}-%{offsetEnd} من %{total}",
      page_rows_per_page: "الصفوف لكل صفحة:",
      next: "التالى",
      prev: "السابق",
      skip_nav: "تخطي الى المحتوي",
    },
    sort: {
      sort_by: "رتب حسب %{field} %{order}",
      ASC: "تصاعدي",
      DESC: "تنازلي",
    },
    auth: {
      auth_check_error: "الرجاء تسجيل الدخول للاستمرار",
      user_menu: "الملف الشخصي",
      username: "اسم المستخدم",
      password: "كلمة السر",
      sign_in: "تسجيل الدخول",
      sign_in_error: "أخفقت المصادقة، يرجى إعادة المحاولة",
      logout: "تسجيل الخروج",
    },
    notification: {
      updated: "تم تحديث العنصر |||| تم تحديث%{smart_count} من العناصر",
      created: "تم إنشاء العنصر",
      deleted: "تم حذف العنصر |||| تم حذف%{smart_count} من العناصر",
      bad_item: "عنصر غير صحيح",
      item_doesnt_exist: "العنصر غير موجود",
      http_error: "خطأ في اتصال الخادم",
      i18n_error: "لا يمكن تحميل الترجمة لهذه اللغة",
      data_provider_error:
        "خطأ في مزود البيانات. تحقق من وحدة التحكم للحصول على التفاصيل.",
      canceled: "تم إلغاء الإجراء",
      logged_out: "انتهت جلستك، يرجى إعادة الاتصال.",
    },
    validation: {
      required: "مطلوب",
      minLength: "يجب أن يكون%{min} حرفًا على الأقل",
      maxLength: "يجب أن يكون%{max} حرفًا أو أقل",
      minValue: "يجب أن يكون%{min} على الأقل",
      maxValue: "يجب أن يكون%{max} أو أقل",
      number: "يجب أن يكون رقما",
      email: "يجب أن يكون بريدًا إلكترونيًا صالحًا",
      oneOf: "يجب أن يكون واحدًا من:%{options}",
      regex: "يجب أن يتطابق مع تنسيق محدد (regex):%{pattern}",
    },
  },
  no: "لا يوجد",
  records: "بيانات",
};

export default arabicMessages;
